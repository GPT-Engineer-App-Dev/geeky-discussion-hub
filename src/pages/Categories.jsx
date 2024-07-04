import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fetchCategories = async () => {
  const response = await fetch("/api/categories");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Categories = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      {data.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{category.description}</p>
            <p>{category.discussionsCount} discussions</p>
            <Link to={`/category/${category.id}`} className="text-blue-500">
              View Discussions
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Categories;