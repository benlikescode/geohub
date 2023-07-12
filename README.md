# GeoHub

## What is GeoHub?

GeoHub is my own version of the popular geography guessing game: Geoguessr.

For those unfamilar with Geoguessr, it uses Google Streetview to place you in a random location and you have to guess where you think you are in the world. You can move around and use clues around you such as Language, Architecture, Road Signs, etc... to make your guess. The objective is clear, the closer you are to the correct location, the more points you get.

## How do I play?

Go to the website: [GeoHub](https://geohub.vercel.app) and create an account, it is free and takes 15 seconds. If you don't want to create your own account, you can login to the guest account using the credentials below:

- Email: `guest@geohub.com`
- Password: `geohub`

Once you have an account, you are ready to play! You can click play on any of the offical maps on the home page such as:

- [World](https://geohub.vercel.app/map/6185df7a7b54baf63473a53e)
- [Famous Landmarks](https://geohub.vercel.app/map/6185dfd47b54baf63473a540)
- [Canada](https://geohub.vercel.app/map/6185dff27b54baf63473a541)
- [United States](https://geohub.vercel.app/map/6185e0077b54baf63473a542)

Or you can click on the `Find Maps` link on the sidebar to navigate between all the different supported country maps and community favorites!

If you get bored of playing the standard gamemodes, you can try out the other gamemodes available:

- [Country Streaks](https://geohub.vercel.app/streaks) Tired of trying to pinpoin the exact location? Try this gamemode where you only have to guess the correct country!
- [The Daily Challenge](https://geohub.vercel.app/daily-challenge) Want to compete against others? Try out the daily challenge which has new rounds every single day!

Want to play with friends? Create a challenge link by following the steps below:

1. Choose a map you want to play
2. Click `Play Now` to open up the settings view
3. Instead of `Single Player` select `Challenge`
4. Choose the game play settings you want to enforce for the challenge
5. Click start and copy the challenge link
6. Share this link with friends and see how you compare

Tired of having the locations picked for you? Create your own map by following the steps below:

1. Click on the `My Maps` link on the sidebar
2. Click the `Create New Map` button
3. Choose a name for your map, and optionally a description and map avatar
4. Click `Next` to setup your custom map
5. Once on the map editor page, you can start adding locations to your map
6. Click anywhere on the map to preview the streetview location
7. Once you have added all the locations you want, click on the `Save Map` button which will save and publish your map

## FAQ

1. Why are the colors inverted on google maps?

   - This means the daily quota for the google maps API has been reached since the game is currently running on the Google Maps free tier. The daily quota resets at midnight Pacific Time (PT). If you want to play unlimited games without hitting the daily quota, see below for how to add/create your own Google Maps API key.

2. How do I add my own Google Maps API key?

   - Go to your profile page and click on the settings button on the far right (alternatively you can go to this URL: [Settings](https://geohub.vercel.app/user/settings)).
   - You then simply paste your key into the `Custom API Key` field and click `Save Changes`. Now all you have to do is refresh the page and enojoy playing as much as you want!

3. How do I create my own Google Maps API key?

   - Follow the steps outlined in this [PDF](https://geohub.vercel.app/custom-key-instructions.pdf)

4. Will it cost me money to create my own Google Maps API key?

   - Short answer: No, it is nearly impossible to exceed the $200 USD credit per month on your own. To put it into perspective, you would have to play atleast 100 games every day of the month to even come close to exceeding the free tier.
   - If you are still concerned about getting billed, you can monitor your current billing period usage at any time by going to the Billing page on your Google Cloud account.

## Steps to run locally

1. Clone this repository
2. Create a Google Maps billing account and save the API key
3. Create a MongoDB database and save the connection string and name of the database you create
4. Create random secrets for NextAuth & Cryptr -> you can generate a secret by running the following in your Linux/Windows terminal: `openssl rand -base64 32`
5. In the root of the app, create a .env file and add the values below (replacing with your created credentials)

```
NEXT_PUBLIC_GOOGLE_API_KEY="your-google-maps-key"
MONGO_URI="your-mongodb-connection-string"
DB_NAME="your-mongodb-database-name"
NEXTAUTH_SECRET="any-random-string"
CRYPTR_SECRET="any-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

Next, you can install the required dependencies and start the local dev server:

```
yarn
yarn dev
```

Now, you should be able to see the site running locally at [http://localhost:3000](http://localhost:3000)

## Technologies Used

- NextJS
- TypeScript
- MongoDB
- Google Maps API
- NextAuth

## Screenshots

![geohub-home](https://github.com/benlikescode/geohub/assets/63207900/f055667d-10e3-4b22-8a01-9aeb3fa86716)
![geohub-map-page](https://github.com/benlikescode/geohub/assets/63207900/51c88624-f82b-4b03-a9eb-326966460f4c)
![geohub-game-view](https://github.com/benlikescode/geohub/assets/63207900/701ae09b-1a54-4c71-91fe-3131a738dcf8)
![geohub-result-view](https://github.com/benlikescode/geohub/assets/63207900/736ccaa9-c165-4553-ad16-64b64adaa9f3)
![geohub-leaderboard-view](https://github.com/benlikescode/geohub/assets/63207900/b0daa1f3-9734-496b-b34d-a68fec7f07c4)
![geohub-login](https://github.com/benlikescode/geohub/assets/63207900/b70d1509-7e5e-4975-a177-08770c61cab1)
![geohub-register](https://github.com/benlikescode/geohub/assets/63207900/bb838e05-99fc-4c87-9649-60908d6448fb)
