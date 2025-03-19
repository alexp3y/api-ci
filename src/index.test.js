const { version } = require('../package.json');

// Create a mock app object that we'll provide to Express
const mockApp = {
  use: jest.fn(),
  get: jest.fn(),
  listen: jest.fn((port, callback) => {
    callback && callback();
    return mockApp;
  }),
};

// Mock Express
jest.mock('express', () => {
  // Return a function that returns our mockApp
  const mockExpress = jest.fn(() => mockApp);
  mockExpress.json = jest.fn();

  return mockExpress;
});

// Mock console.log to prevent output during tests
console.log = jest.fn();

describe('API Server', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear the module cache so we get a fresh instance
    jest.resetModules();
    // Load the index.js file which will use our mocked Express
    require('./index');
  });

  it('should log server start with correct version', () => {
    expect(console.log).toHaveBeenCalledWith(`API version: ${version}`);
  });

  it('should set up routes', () => {
    // Here we use the same mockApp that was provided to index.js
    expect(mockApp.get).toHaveBeenCalledTimes(3);

    // Root route
    expect(mockApp.get).toHaveBeenCalledWith('/', expect.any(Function));

    // Health route
    expect(mockApp.get).toHaveBeenCalledWith('/health', expect.any(Function));

    // Version route
    expect(mockApp.get).toHaveBeenCalledWith('/version', expect.any(Function));
  });
});
