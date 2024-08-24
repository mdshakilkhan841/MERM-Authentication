import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
const Home = () => {
  const { user, error } = useAuthStore();

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="sm:text-3xl text-xl font-semibold text-center">
          Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:w-96 border rounded-md p-4">
          <div className="grid gap-2">
            <Label className="sm:text-xl" htmlFor="email">
              Personal Information
            </Label>
            <div>
              <div>
                <span className="font-semibold">Name :</span> {user?.name}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user?.email}
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 front-semibold">{error}</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;
