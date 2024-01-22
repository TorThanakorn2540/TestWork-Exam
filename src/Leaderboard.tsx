interface LeaderboardProps {
  leaderboard: any[];
}

const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  return (
    <div className="sec-lb">
      <div className="lb-title">
        <h2>Leaderboard</h2>
      </div>
      <div className="card-body">
        <ul>
          {leaderboard.map((entry, index) => (
            <li key={index} >
              <span>{index + 1}</span>{entry.playerName} : {entry.score} points
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
