import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from "nest-winston";
import { format, transports } from "winston";

export const LoggerFactory = (
  appName: string,
  useJson: boolean,
  loggerLevel: string,
) => {
  let consoleFormat;

  if (useJson) {
    consoleFormat = format.combine(
      format.ms(),
      format.timestamp(),
      format.json(),
    );
  } else {
    consoleFormat = format.combine(
      format.timestamp(),
      format.ms(),
      nestWinstonModuleUtilities.format.nestLike(appName, {
        colors: true,
        prettyPrint: true,
      }),
    );
  }

  return WinstonModule.createLogger({
    level: loggerLevel,
    transports: [new transports.Console({ format: consoleFormat })],
  });
};
