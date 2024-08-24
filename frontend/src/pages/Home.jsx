import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import moment from "moment";
const Home = () => {
  const { user, error } = useAuthStore();
  console.log("🚀 ~ Home ~ user:", user);

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="sm:text-3xl text-xl font-semibold text-center">
          Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-4 sm:w-96 border border-gray-300 rounded-md p-4 bg-gray-100">
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
        <div className="grid gap-4 sm:w-96 border border-gray-300 rounded-md p-4 bg-gray-100">
          <div className="grid gap-2">
            <Label className="sm:text-xl" htmlFor="email">
              Account Activity
            </Label>
            <div>
              <div>
                <span className="font-semibold">Joined :</span>{" "}
                {moment(user?.createdAt).format("LL")}
              </div>
              <div>
                <span className="font-semibold">Last Login:</span> {moment(user?.lastLogin).format("LLL")}
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
