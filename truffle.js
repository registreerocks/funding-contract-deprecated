module.exports = {
  networks: {
      development: {
          host: "localhost",
          port: 7545,
          network_id: "*" // Match any network id
      },
      deployment: {
        host: "111.11.111.111",
        port: 7545,
        network_id: "*" // Match any network id
    }
  }
};
