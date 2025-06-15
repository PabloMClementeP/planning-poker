import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import type { PokerCardValue, User, Vote } from "../../../../types";
import ChartColumn from "../../../../ui/icons/chart-column";
import { PokerCard } from "../../../../ui/poker-card";
import {
  ChartContainer,
  IndividualVoteContainer,
  UserVoteContainer,
} from "./results-section.style";
import { SectionText } from "./voting-section-style";

interface ResultsSectionProps {
  users: User[];
  votes: Record<string, Vote>;
}

const ResultsSection = ({ users, votes }: ResultsSectionProps) => {
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setChartKey((prev) => prev + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const voteCounts: Record<PokerCardValue, number> = {};
  let totalVotes = 0;

  Object.values(votes).forEach((vote) => {
    voteCounts[vote.value] = (voteCounts[vote.value] || 0) + 1;
    totalVotes++;
  });

  const getWinningVotes = () => {
    if (totalVotes === 0) return [];
    let maxCount = 0;
    for (const value in voteCounts) {
      if (voteCounts[value] > maxCount) {
        maxCount = voteCounts[value];
      }
    }
    return Object.keys(voteCounts).filter(
      (value) => voteCounts[value] === maxCount
    );
  };

  const winningVotes = getWinningVotes();

  const sortedUsers = users.slice().sort((a, b) => {
    const aVote = votes[a.id]?.value;
    const bVote = votes[b.id]?.value;
    const aIsWinner =
      aVote !== undefined && winningVotes.includes(String(aVote));
    const bIsWinner =
      bVote !== undefined && winningVotes.includes(String(bVote));
    return Number(bIsWinner) - Number(aIsWinner);
  });

  const chartData = [
    ["Valor", "Cantidad"],
    ...Object.entries(voteCounts).map(([value, count]) => {
      const percentage = ((count / totalVotes) * 100).toFixed(1);
      return [`${value} (${count} voto, ${percentage}%)`, count];
    }),
  ];

  const chartOptions = {
    title: "Resumen de votos",
    is3D: true,
    backgroundColor: "transparent",
    legend: { position: "right", textStyle: { fontSize: 24 } },
    chartArea: { width: "90%", height: "80%" },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <SectionText>
          <ChartColumn color="#6DD5ED" />
          Resultado de la votación:
        </SectionText>

        {winningVotes.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: winningVotes.length === 1 ? "#6DD5ED" : "#FFC107",
                margin: 0,
                padding: 0,
              }}
            >
              {winningVotes.length === 1 ? "Ganador: " : "Ganadores: "}
              {winningVotes
                .map((v) => (
                  <span
                    key={v}
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: winningVotes.length === 1 ? "#a72b3c" : "#FFC107",
                    }}
                  >
                    {v}
                  </span>
                ))
                .reduce((prev, curr) => (
                  <>
                    {prev} - {curr}
                  </>
                ))}
            </p>
          </div>
        )}
      </div>

      {totalVotes > 0 && (
        <ChartContainer>
          <Chart
            key={chartKey}
            chartType="PieChart"
            data={chartData}
            options={chartOptions}
            width={"100%"}
            height={"300px"}
          />
        </ChartContainer>
      )}

      <div>
        <h3>Votos Individuales:</h3>
        {users.length > 0 ? (
          <IndividualVoteContainer>
            {sortedUsers.map((user) => {
              const voteValue = votes[user.id]?.value;
              const isWinner =
                voteValue !== undefined &&
                winningVotes.includes(String(voteValue));
              return (
                <UserVoteContainer key={user.id}>
                  <PokerCard
                    value={voteValue ?? "-"}
                    isRevealed={true}
                    actualVoteValue={voteValue}
                    interactive={false}
                    width={80}
                  />
                  <span title={user.name}>{user.name}</span>
                  {isWinner && <p>Más votado</p>}
                </UserVoteContainer>
              );
            })}
          </IndividualVoteContainer>
        ) : (
          <p>No hay votos para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default ResultsSection;
