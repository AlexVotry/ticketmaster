start in cmdl: skaffold dev.

this will start all the docker containers.  I currently have it set for "mytickets.com"

each main folder is it's own microservice. To Run this you'd need to install dependencies for each folder. 
Each folder represents a docker container and is deployed using kubernetes.
I have them skaffolded together and will run with the command "skaffold dev"

