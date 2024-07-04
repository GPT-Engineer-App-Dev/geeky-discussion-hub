import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetchFeaturedDiscussions = async () => {
  const response = await fetch("/api/featured-discussions");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchLatestDiscussions = async () => {
  const response = await fetch("/api/latest-discussions");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const { data: featuredDiscussions, error: featuredError, isLoading: isLoadingFeatured } = useQuery({
    queryKey: ["featuredDiscussions"],
    queryFn: fetchFeaturedDiscussions,
  });

  const { data: latestDiscussions, error: latestError, isLoading: isLoadingLatest } = useQuery({
    queryKey: ["latestDiscussions"],
    queryFn: fetchLatestDiscussions,
  });

  if (isLoadingFeatured || isLoadingLatest) return <div>Loading...</div>;
  if (featuredError) return <div>Error: {featuredError.message}</div>;
  if (latestError) return <div>Error: {latestError.message}</div>;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">Featured Discussions</h2>
        <div className="space-y-4">
          {featuredDiscussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardHeader>
                <CardTitle>{discussion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{discussion.excerpt}</p>
                <Link to={`/discussion/${discussion.id}`} className="text-blue-500">
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4">Latest Discussions</h2>
        <div className="space-y-4">
          {latestDiscussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardHeader>
                <CardTitle>{discussion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{discussion.excerpt}</p>
                <Link to={`/discussion/${discussion.id}`} className="text-blue-500">
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;