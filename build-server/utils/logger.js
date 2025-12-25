import { kafkaProducer } from "../client/kafkaProducer.js";
import { publishLog } from "./publishLog.js";

export class Logger {
  enabled = false;

  async init() {
    try {
      await kafkaProducer.connect();
      this.enabled = true;
      console.log("Kafka connected");
    } catch (err) {
      this.enabled = false;
      console.warn("Kafka unavailable, continuing without logs");
    }
  }

  async log(message) {
    if (!this.enabled) return;

    try {
      await publishLog(message);
    } catch (err) {
      this.enabled = false;
      console.warn("Kafka logging disabled:", err.message);
    }
  }
}
