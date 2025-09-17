export const ROOT_PATH = process.cwd();

export const { NODE_ENV = 'development', PORT = 8080, LOG_DIR = `${ROOT_PATH}/logs`, LOG_FORMAT = 'dev', ORIGIN = '*' } = process.env;
