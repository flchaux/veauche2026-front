import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ThumbsUp, ThumbsDown, Users, BarChart3 } from "lucide-react";

interface MesureVoteStats {
  mesure_id: number;
  mesure_titre: string;
  likes: number;
  dislikes: number;
  total: number;
}

interface VoterStats {
  ip_address: string;
  likes: number;
  dislikes: number;
  total: number;
}

export default function VotesAdmin() {
  const [mesureStats, setMesureStats] = useState<MesureVoteStats[]>([]);
  const [voterStats, setVoterStats] = useState<VoterStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        setIsLoading(true);
        
        // Récupérer toutes les mesures
        const mesuresResponse = await fetch(
          `${import.meta.env.VITE_STRAPI_URL}/api/mesures?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
            },
          }
        );
        const mesuresData = await mesuresResponse.json();
        const mesures = mesuresData.data || [];

        // Récupérer tous les votes
        const votesResponse = await fetch(
          `${import.meta.env.VITE_STRAPI_URL}/api/votes-mesures?populate=*&pagination[limit]=10000`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
            },
          }
        );
        const votesData = await votesResponse.json();
        const votes = votesData.data || [];

        // Calculer les statistiques par mesure
        const mesureStatsMap = new Map<number, MesureVoteStats>();
        
        mesures.forEach((mesure: any) => {
          mesureStatsMap.set(mesure.id, {
            mesure_id: mesure.id,
            mesure_titre: mesure.titre || `Mesure ${mesure.id}`,
            likes: 0,
            dislikes: 0,
            total: 0,
          });
        });

        votes.forEach((vote: any) => {
          const mesureId = vote.mesure?.id;
          if (mesureId && mesureStatsMap.has(mesureId)) {
            const stats = mesureStatsMap.get(mesureId)!;
            if (vote.vote_ype === "like") {
              stats.likes++;
            } else if (vote.vote_ype === "dislike") {
              stats.dislikes++;
            }
            stats.total++;
          }
        });

        const mesureStatsArray = Array.from(mesureStatsMap.values())
          .sort((a, b) => b.total - a.total);

        // Calculer les statistiques par IP
        const voterStatsMap = new Map<string, VoterStats>();
        
        votes.forEach((vote: any) => {
          const ip = vote.ip_address || "Unknown";
          if (!voterStatsMap.has(ip)) {
            voterStatsMap.set(ip, {
              ip_address: ip,
              likes: 0,
              dislikes: 0,
              total: 0,
            });
          }
          
          const stats = voterStatsMap.get(ip)!;
          if (vote.vote_ype === "like") {
            stats.likes++;
          } else if (vote.vote_ype === "dislike") {
            stats.dislikes++;
          }
          stats.total++;
        });

        const voterStatsArray = Array.from(voterStatsMap.values())
          .sort((a, b) => b.total - a.total);

        setMesureStats(mesureStatsArray);
        setVoterStats(voterStatsArray);
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques:", err);
        setError("Erreur lors du chargement des statistiques");
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 animate-pulse text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-destructive">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const totalVotes = mesureStats.reduce((sum, stat) => sum + stat.total, 0);
  const totalLikes = mesureStats.reduce((sum, stat) => sum + stat.likes, 0);
  const totalDislikes = mesureStats.reduce((sum, stat) => sum + stat.dislikes, 0);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Administration des Votes</h1>
          <p className="text-muted-foreground">
            Statistiques détaillées des votes sur les mesures du programme
          </p>
        </div>

        {/* Statistiques globales */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total votes</p>
                  <p className="text-2xl font-bold">{totalVotes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ThumbsUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Likes</p>
                  <p className="text-2xl font-bold">{totalLikes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <ThumbsDown className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dislikes</p>
                  <p className="text-2xl font-bold">{totalDislikes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Votants uniques</p>
                  <p className="text-2xl font-bold">{voterStats.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques par mesure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Votes par Mesure</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Mesure</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      Likes
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                      Dislikes
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">% Positif</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mesureStats.map((stat) => {
                  const positivePercent = stat.total > 0 
                    ? Math.round((stat.likes / stat.total) * 100) 
                    : 0;
                  
                  return (
                    <TableRow key={stat.mesure_id}>
                      <TableCell className="font-medium">{stat.mesure_id}</TableCell>
                      <TableCell className="max-w-md truncate">{stat.mesure_titre}</TableCell>
                      <TableCell className="text-center font-semibold text-green-600">
                        {stat.likes}
                      </TableCell>
                      <TableCell className="text-center font-semibold text-red-600">
                        {stat.dislikes}
                      </TableCell>
                      <TableCell className="text-center font-semibold">
                        {stat.total}
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                            positivePercent >= 70
                              ? "bg-green-100 text-green-700"
                              : positivePercent >= 50
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {positivePercent}%
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Statistiques par votant (IP) */}
        <Card>
          <CardHeader>
            <CardTitle>Votes par Adresse IP</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Adresse IP</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      Likes
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                      Dislikes
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Total votes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {voterStats.map((stat, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{stat.ip_address}</TableCell>
                    <TableCell className="text-center font-semibold text-green-600">
                      {stat.likes}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-red-600">
                      {stat.dislikes}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {stat.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
