import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

interface SearchParams {
  title?: string;
  description?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const srcp = await searchParams;

  const pageTitle = srcp.title || "Default Project Title";
  const pageDescription =
    srcp.description ||
    "The 'description' query parameter was not found in the URL.";

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-gray-50 p-6 md:p-10">
      <Card className="w-full max-w-2xl shadow-xl transition-all hover:shadow-2xl">
        <CardHeader className="p-6 md:p-8 bg-blue-50/50 border-b rounded-t-lg">
          <CardTitle className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            {pageTitle}
          </CardTitle>
          <CardDescription>{pageDescription}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
