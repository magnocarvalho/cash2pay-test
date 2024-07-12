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
    consoleFormat = format.combine(format.timestamp(), format.json());
  } else {
    consoleFormat = format.combine(
      format.metadata(),
      format.timestamp(),
      format.align(),
      format.prettyPrint(),
      nestWinstonModuleUtilities.format.nestLike(appName, {
        colors: true,
        prettyPrint: true,
      }),
    );
  }

  return WinstonModule.createLogger({
    level: loggerLevel,
    transports: [new transports.Console({ format: consoleFormat })],
    defaultMeta: { service: appName, version: process.env.npm_package_version },
  });
};
