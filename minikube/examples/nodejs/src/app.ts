import dotenv from "dotenv";
dotenv.config();

import promMiddleware from "express-prometheus-middleware";
import { trace, SpanStatusCode } from "@opentelemetry/api";
import pinoHttp from "pino-http";
import express from "express";
import { rollTheDice } from "./dice";
import { getLogger } from "./lib/logger";

const tracer = trace.getTracer("dice-server", "0.1.0");

const logger = getLogger("dice-server");

const PORT = parseInt(process.env.PORT || "8080");
const app = express();

app.use(
  promMiddleware({
    metricsPath: "/metrics",
  })
);

const httpLogger = pinoHttp({
  logger: getLogger('http'),
  autoLogging: {
    ignore: (req) => {
      return req.url === '/healthz' || req.url === '/metrics'
    }
  }
})

app.use(httpLogger)

app.get("/rolldice", (req, res) => {
  return tracer.startActiveSpan("rollDice", (span) => {
    logger.info("Received request to roll dice");
    const rolls = req.query.rolls ? parseInt(req.query.rolls.toString()) : NaN;
    if (isNaN(rolls)) {
      const errorMessage =
        "Request parameter 'rolls' is missing or not a number.";
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: errorMessage,
      });
      console.error(errorMessage);
      // logger.error(errorMessage)
      res.status(400).send(errorMessage);
      span.end();
      return;
    }
    const result = JSON.stringify(rollTheDice(rolls, 1, 6));
    span.end();
    res.send(result);
  });
});

app.get("/greet", (req, res) => {
  return tracer.startActiveSpan("greet", (span) => {
    logger.info("Received request to greet");
    span.end();
    res.send("Hello World");
  });
});

app.get("/healthz", (_req, res) => {
  res.status(200).send("ok");
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://127.0.0.1:${PORT}`);
});
