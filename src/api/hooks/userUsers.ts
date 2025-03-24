import { useQuery } from "@tanstack/react-query";
import { createRequest, responseWrapper } from "api/axios";
import { User } from "types/user";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      responseWrapper(
        createRequest({
          method: "get",
          url: "/users",
        }),
      ),
  });
