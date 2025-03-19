const { version } = require('../package.json');

// Mock Express
jest.mock('express', () => {
  const mockApp = {
    use: jest.fn(),
    get: jest.fn(),
    listen: jest.fn((port, callback) => {
      callback();
      return mockApp;
    }),
  };

  const mockExpress = () => mockApp;
  mockExpress.json = jest.fn();

  return mockExpress;
});

// Mock console.log
console.log = jest.fn();

describe('API Server', () => {
  let app;

  beforeEach(() => {
    jest.clearAllMocks();
    app = require('./index');
  });

  it('should log server start with correct version', () => {
    expect(console.log).toHaveBeenCalledWith(`API version: ${version}`);
  });

  it('should set up routes', () => {
    const express = require('express');
    const mockApp = express();

    expect(mockApp.get).toHaveBeenCalledTimes(3);

    // Root route
    expect(mockApp.get).toHaveBeenCalledWith('/', expect.any(Function));

    // Health route
    expect(mockApp.get).toHaveBeenCalledWith('/health', expect.any(Function));

    // Version route
    expect(mockApp.get).toHaveBeenCalledWith('/version', expect.any(Function));
  });
});
