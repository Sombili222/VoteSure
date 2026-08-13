import { Link } from "react-router-dom";
import Button from "../../common/Button";

function HeroText() {
  return (
    <div className="flex-1 text-center lg:text-left">

      <p className="text-blue-600 font-semibold uppercase tracking-widest">

        Secure • Transparent • Trusted

      </p>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-slate-900 mt-4">

        Secure Digital  Voting 

        <span className="text-blue-600">

          {" "}Made Simple.

        </span>

      </h1>

      <p className="text-gray-600 text-lg leading-8 mt-8 max-w-lg mx-auto lg:mx-0">

        Your vote counts. Every election.

        Conduct secure elections with live counting,
        verified voters and transparent results.

      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">

        <Link to="/register">

          <Button className="bg-blue-600 text-white shadow-lg w-full sm:w-auto">

            Create Election

          </Button>

        </Link>

        <Link to="/login">

          <Button className="bg-white border border-gray-300 text-gray-900 w-full sm:w-auto">

            Login

          </Button>

        </Link>

      </div>

    </div>
  );
}

export default HeroText;