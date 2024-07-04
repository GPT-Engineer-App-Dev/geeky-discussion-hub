import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const fetchDiscussion = async (id) => {
  const response = await fetch(`/api/discussion/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Discussion = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["discussion", id],
    queryFn: () => fetchDiscussion(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.content}</p>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {data.replies.map((reply) => (
          <Card key={reply.id}>
            <CardContent>
              <p>{reply.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <form className="space-y-2">
        <Textarea placeholder="Write your reply..." />
        <Button type="submit">Reply</Button>
      </form>
    </div>
  );
};

export default Discussion;