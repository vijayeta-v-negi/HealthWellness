import {
  FaHome,
  FaRunning,
  FaAppleAlt,
  FaBullseye,
  FaUser,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white">

      <div className="p-6 text-2xl font-bold">
        Wellness+
      </div>

      <nav className="flex flex-col p-4 gap-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-3"
        >
          <FaHome />
          Dashboard
        </Link>

        <Link
          to="/fitness"
          className="flex items-center gap-3"
        >
          <FaRunning />
          Fitness
        </Link>

        <Link
          to="/nutrition"
          className="flex items-center gap-3"
        >
          <FaAppleAlt />
          Nutrition
        </Link>

        <Link
          to="/goals"
          className="flex items-center gap-3"
        >
          <FaBullseye />
          Goals
        </Link>

        <Link
          to="/profile"
          className="flex items-center gap-3"
        >
          <FaUser />
          Profile
        </Link>

      </nav>
    </div>
  );
}