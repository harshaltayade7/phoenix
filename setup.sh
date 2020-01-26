

echo "\n Installing project level dependencies... \n"

npm install;

echo "\n Installing server depencencies... \n"
cd server
npm install

echo "\n Installing client dependencies...\n"
cd ..
cd client
npm install

echo "Finished installing all dependencies"
echo "you are good to go now"
echo "run npm start to start your project"

