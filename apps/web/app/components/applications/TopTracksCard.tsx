'use client';

export default function TopTracksCard({ applications }: { applications: any[] }) {
  // Calculate track statistics
  const trackStats = applications.reduce((acc: any, app: any) => {
    const track = app.track || 'N/A';
    acc[track] = (acc[track] || 0) + 1;
    return acc;
  }, {});

  const topTracks = Object.entries(trackStats)
    .map(([track, count]) => ({ track, count: count as number }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  const trackColors: { [key: string]: string } = {
    'Smart Contract': 'from-purple-500 to-purple-400',
    'Frontend': 'from-blue-500 to-blue-400',
    'DevOps': 'from-orange-500 to-orange-400',
    'Blockchain Research': 'from-pink-500 to-pink-400',
    'N/A': 'from-gray-500 to-gray-400',
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/40 to-gray-900/20 border border-emerald-400/10 rounded-xl p-5 backdrop-blur-md">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">Top Tracks</h3>
          <p className="text-xs text-gray-500">Most applied tracks</p>
        </div>

        <div className="space-y-3">
          {topTracks.length > 0 ? (
            topTracks.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.track}</span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">{item.count}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${trackColors[item.track] || trackColors['N/A']} rounded-full`}
                    style={{
                      width: `${Math.max((item.count / Math.max(...topTracks.map(t => t.count))) * 100, 10)}%`,
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}