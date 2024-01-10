import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import GroupArea from './GroupArea';
const SecondarySidebar = () => {
  return (
    <Tabs defaultValue='groups' className='w-full col-span-2'>
      <TabsList className='grid grid-cols-2 w-full'>
        <TabsTrigger value='groups'>Groups</TabsTrigger>
        <TabsTrigger value='friends'>Friends</TabsTrigger>
      </TabsList>

      <TabsContent value='groups'>
        <GroupArea />
      </TabsContent>
      <TabsContent value='friends'>

      </TabsContent>
    </Tabs>
  )
}

export default SecondarySidebar;