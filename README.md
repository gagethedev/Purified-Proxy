## Welcome to Purified!

Purified is my newest and best proxy project yet. It's made with Next.js, TailwindCSS, and Fastify!

## How to Run

To run, first ensure you're using the proper package manager, PNPM (which stands for "performant node package manager") as it's what this project uses. For more information on the difference between npm, Yarn and pnpm, please look [here](https://www.codemancers.com/blog/2024-01-24-npm-yanr-pnpm/#:~:text=Pnpm%2C%20which%20stands%20for%20%22performant,space%20use%20and%20dependency%20management.).

Next, we need to do all the time consuming parts. First, install all the packages required to run this program using `pnpm install`. Once that is finished, you can either build the project or you can run the development server (much slower, unoptimized). To build it, please run `pnpm build` and follow those instructions. If you just want a slower development server, you can start off by running `pnpm run dev`.

Then, all you have to do is run `pnpm start` and it'll start the server up for you! If you would like to change the port, you can change the enviornment variable `PORT` or preferably, run a reverse proxy and add SSL that way while you're at it. Please note that this proxy will not work without SSL/HTTPS expect on localhost and 127.0.0.1!