const sequelize = require('sequelize');
const { Op } = sequelize;
const andarBaharMatch = require("../models/andarBaharMatch")
const Player = require('../models/player');
const Bets = require('../models/currentMatchBets');
const Cards = require('../models/cards');

let andarBettemp = 0;
let baharBettemp = 0;

let currentMatchId = null; // Initialize the variable to hold the current match ID
let matchTimer = 0; // Initialize the match timer


// Function to create a new match
const createNewMatch = async (req, res) => {
  try {
    const lastMatch = await andarBaharMatch.findOne({
        order: [['createdAt', 'DESC']],
      });
  
      if (lastMatch) {
        const lastMatchTime = lastMatch.createdAt;
        const nextMatchTime = new Date(lastMatchTime.getTime() + 40 * 1000);
  
        // Check if it's time to create a new match
        if (nextMatchTime <= new Date()) {
          const createdMatch = await andarBaharMatch.create();
          currentMatchId = createdMatch.id;
          const randCard = await getRandomcard();
          console.log(randCard);
          await andarBaharMatch.update({ mainCard: randCard },
          { where: { id: currentMatchId } });
          await Bets.destroy({
            where: {}, // Empty object means no specific condition, so it matches all rows
            truncate: true // Truncate ensures resetting auto-increment IDs (if any)
          });
          // console.log('New match created with ID:', currentMatchId);    
        } else {
          // console.log('Waiting for the next match creation time. Current match id is',lastMatch.id);
          // console.log("list of players in current room", lastMatch.playerIds)
        }
      } else {
        // No existing match, create a new one
        const createdMatch = await andarBaharMatch.create();
        currentMatchId = createdMatch.id;
        const randCard = await getRandomcard();
        console.log(randCard);
        await andarBaharMatch.update({ mainCard: randCard },
        { where: { id: currentMatchId } });
        await Bets.destroy({
          where: {}, // Empty object means no specific condition, so it matches all rows
          truncate: true // Truncate ensures resetting auto-increment IDs (if any)
        });
        // console.log('New match created with ID:', currentMatchId);
      }
  } catch (error) {
    console.error('Error creating new match:', error);
  }


};

// Create a new match initially
// createNewMatch();


 // Set an interval to create a new match every 40 seconds
 setInterval(createNewMatch, 1000);

//  This is code for status of current match with request 

const matchStatus = async (req, res) => {
//  console.log("current match id is",currentMatchId);
 const lastMatch = await andarBaharMatch.findOne({
  order: [['createdAt', 'DESC']],
});
 console.log("array of players in current match",lastMatch.playerIds)
 return res.status(200).json({
  currentMatchId: lastMatch.id,
  players: lastMatch.playerIds,
  mainCard: lastMatch.mainCard
});
};

// function to generate random card 

const getRandomcard = async () => {
  try {
    const randomCard = await Cards.findOne({
      attributes: ['img'], // Select the 'img' column
      order: sequelize.literal('RAND()'), // Order by random
    });

    return randomCard.img; // Return the image URL
  } catch (error) {
    console.error('Error fetching random card:', error);
    throw error;
  }
};


const placeBet = async (req, res) => {
  console.log(req.body);

    const { playerId, amount, betOn } = req.body;
   
      const intAmount = parseInt(amount, 10);
      if (betOn == "0"){
        andarBettemp = andarBettemp + intAmount;
      }
      else {
        baharBettemp = baharBettemp + intAmount;
      }
  
    try {
      // Retrieve player's current balance
      const player = await Player.findByPk(playerId);
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      const currentBalance = player.playerBalance;
  
      if (currentBalance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      // Update player's balance after placing the bet
      const updatedBalance = currentBalance - amount;
      await Player.update({ playerBalance: updatedBalance }, { where: { id: playerId } });

      // get current match id and player id from db 
      const lastMatch = await andarBaharMatch.findOne({
        order: [['createdAt', 'DESC']],
      });
      let currentMatchId = lastMatch.id;
      let playerIds = currentMatchId.playerIds || [];
      playerIds = [playerId];
  
      // Insert playerId into Matches table
      await andarBaharMatch.update(
        { playerIds,
          andarBet : andarBettemp,
          baharBet : baharBettemp,
        },
      { where: { id: currentMatchId } }
      );

      await Bets.create({
        playerIds: playerId,
        andarOrBahar: betOn,
        amount: amount
      });
  
      return res.status(200).json({ message: 'Bet placed successfully', playerId });
    } catch (error) {
      console.error('Error placing bet:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

}

const playerBalance = async (req, res) => {
  const { playerId } = req.body;
  const playerBal = await Player.findOne({
    attributes: ['playerBalance'],
  where: { id: playerId }
  });
  return res.status(200).json({
    playerBal: playerBal.playerBalance ,
  });
}

module.exports = { createNewMatch, matchStatus, placeBet, playerBalance };
