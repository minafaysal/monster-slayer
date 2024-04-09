function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      counterSpacialAttck: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    myUseSpacialAttack() {
      return this.counterSpacialAttck % 3 !== 0;
    },
  },
  watch: {
    monsterHealth(vlaue) {
      if (vlaue <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (vlaue <= 0) {
        this.winner = "player";
      }
    },
    playerHealth(vlaue) {
      if (vlaue <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (vlaue <= 0) {
        this.winner = "monster";
      }
    },
  },
  methods: {
    startNewGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.counterSpacialAttck = 0;
      this.winner = null;
    },
    attackMonster() {
      const attackVlaue = generateRandomValue(5, 12);
      console.log("attackMonster");
      this.monsterHealth -= attackVlaue;
      this.counterSpacialAttck++;
      this.addLogMessage("player", "attack", this.attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackVlaue = generateRandomValue(8, 15);
      this.playerHealth -= attackVlaue;
      this.addLogMessage("monster", "attack", this.attackValue);
    },
    spacialAttack() {
      const attackVlaue = generateRandomValue(15, 25);
      this.monsterHealth -= attackVlaue;
      this.addLogMessage("player", "attack", this.attackValue);
      this.counterSpacialAttck++;
      this.attackPlayer();
    },
    healPlayer() {
      this.counterSpacialAttck++;
      const healVlaue = generateRandomValue(10, 25);
      if (this.healVlaue + this.playerHealth > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healVlaue;
      }
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
