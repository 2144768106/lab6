// src/stores/olympicStore.js
import { defineStore } from 'pinia';

export const useOlympicStore = defineStore('olympic', {
  state: () => ({
    countries: [
      { id: 1, name: 'USA', gold: 39, silver: 41, bronze: 33, details: 'The United States of America is a country primarily located in North America, consisting of 50 states, a federal district, five major self-governing territories, and various possessions.', sports: ['Basketball', 'Swimming', 'Athletics'] },
      { id: 2, name: 'China', gold: 38, silver: 32, bronze: 18, details: 'China', sports: ['Badminton', 'Table Tennis', 'Diving'] },
      { id: 3, name: 'Japan', gold: 27, silver: 14, bronze: 17, details: 'Japan', sports: ['Judo', 'Wrestling', 'Karate'] },
      { id: 4, name: 'Germany', gold: 27, silver: 23, bronze: 28, details: 'Germany', sports: ['Football', 'Handball', 'Rowing'] },
      { id: 5, name: 'Great Britain', gold: 22, silver: 21, bronze: 22, details: 'Great Britain details...', sports: ['Cycling', 'Rowing', 'Gymnastics'] },
      { id: 6, name: 'Australia', gold: 17, silver: 7, bronze: 22, details: 'Australia details...', sports: ['Swimming', 'Rugby', 'Basketball'] },
      { id: 7, name: 'France', gold: 20, silver: 16, bronze: 14, details: 'France details...', sports: ['Football', 'Cycling', 'Fencing'] },
      { id: 8, name: 'Russia', gold: 19, silver: 18, bronze: 19, details: 'Russia details...', sports: ['Track and Field', 'Wrestling', 'Swimming'] },
      { id: 9, name: 'Italy', gold: 10, silver: 10, bronze: 20, details: 'Italy details...', sports: ['Football', 'Rowing', 'Shooting'] },
      { id: 10, name: 'South Korea', gold: 9, silver: 3, bronze: 9, details: 'South Korea details...', sports: ['Archery', 'Taekwondo', 'Baseball'] },
      { id: 11, name: 'Canada', gold: 7, silver: 6, bronze: 8, details: 'Canada details...', sports: ['Ice Hockey', 'Luge', 'Skiing'] },
      { id: 12, name: 'India', gold: 6, silver: 6, bronze: 12, details: 'India details...', sports: ['Wrestling', 'Badminton', 'Hockey'] },
      { id: 13, name: 'Netherlands', gold: 10, silver: 12, bronze: 9, details: 'Netherlands details...', sports: ['Speed Skating', 'Cycling', 'Field Hockey'] },
      { id: 14, name: 'Spain', gold: 3, silver: 8, bronze: 9, details: 'Spain details...', sports: ['Basketball', 'Tennis', 'Football'] },
      { id: 15, name: 'Brazil', gold: 6, silver: 6, bronze: 6, details: 'Brazil details...', sports: ['Football', 'Volleyball', 'Boxing'] },
    ],
    comments: {}
  }),

 
});

