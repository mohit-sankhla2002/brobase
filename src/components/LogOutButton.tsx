"use client"

import React from 'react'
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
const LogOutButton = () => {
  return (
    <Button size="icon" variant="ghost" onClick={() => signOut({ callbackUrl: "/sign-in" })}>
          <LogOut />
    </Button>
  )
}

export default LogOutButton;