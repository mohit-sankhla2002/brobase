import React from "react";
import { FaGoogle, FaDiscord } from "react-icons/fa"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { Separator } from "~/components/ui/separator";
const page = () => {
  return (
    <section className="mt-10">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Don't Have an Account? <Link href="/sign-up" className="text-blue-600">Sign Up</Link> Instead</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col pt-5">
          {/* Add buttons for Google & Discord Login */}
          <h3 className="text-muted-foreground font-light text-sm text-center uppercase">Continue With</h3>
          <div className="w-fit mx-auto flex gap-2">
            <Button size="icon" variant="ghost" className="rounded-full aspect-square">
              <FaGoogle className="w-5"/>
            </Button>
            <Separator orientation="vertical" />
            <Button size="icon" variant="ghost" className="rounded-full aspect-square">
              <FaDiscord className="w-5"/>
            </Button>
          </div>
          <div className="flex gap-2 items-center text-muted-foreground justify-center my-3">
            <span className="w-4/5 h-[1px] bg-muted-foreground"></span>
            OR
            <span className="w-4/5 h-[1px] bg-muted-foreground"></span>
          </div>
          <h3 className="text-muted-foreground font-light text-sm text-center uppercase mb-3">Sign In With Credentials</h3>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" className="mt-2"/>
          <Label htmlFor="pass" className="mt-5">Password</Label>
          <Input id="pass" type="password" className="mt-2"/>
          <Button size="lg" className="mt-7 font-medium">
            Sign In
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
