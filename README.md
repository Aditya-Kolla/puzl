# puzl
A mobile first quizzing platform

# Setup Guide
## Prerequisites
* Docker https://docs.docker.com/get-docker/
* Docker-compose https://docs.docker.com/compose/install/ \
 On Windows, docker-compose will be installed as part of the docker installation. 
 
## Installation
1. Clone this repository onto your computer.
   ```
   git clone https://github.com/Aditya-Kolla/puzl.git
   ```
2. Navigate to the folder.
   ```
   cd puzl
   ```
3. Create an environment file for the application.
   ```
   touch .env
   ```
4. Run the docker-compose.yaml file which will bootstrap the application. This will take some time to install all the required dependencies.
   ```
   docker-compose up -d
   ```
5. To shut down the application, run the following command.
   ```
   docker-compose down
   ```

## Troubleshooting
If you have made changes to the `docker-compose.yml` or any of the `Dockerfile`, `docker-compose up -d` might build the outdated setup. You have to force the new build:

1. `docker-compose down`
2. `docker volume prune` (To remove database artifacts)
3. `docker-compose up --build -d`

# References
1. [Docker](https://docs.docker.com/get-started/overview/)
2. [Docker compose](https://docs.docker.com/compose/gettingstarted/)
3. [Nodejs](https://nodejs.org/en/docs/)
