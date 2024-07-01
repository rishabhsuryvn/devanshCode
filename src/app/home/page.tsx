"use client"
import { useState } from 'react';
import AudioComponent from "@/components/ui/AudioComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

function Page() {
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number | undefined>(undefined);

  const handleRecordingComplete = (audioUrl: string) => {
    setRecordedAudioUrl(audioUrl);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value));
  };

  return (
    <div>
    <div className="flex justify-center mt-5">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-mattBlack">
          <TabsTrigger value="account">Record</TabsTrigger>
          <TabsTrigger value="password">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className='bg-o'>
            <CardHeader>
              <CardTitle>Record</CardTitle>
              <CardDescription>
                Record your voice here
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className='flex justify-normal'>
                <AudioComponent onRecordingComplete={handleRecordingComplete} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>NFT details</CardTitle>
              <CardDescription>
                Enter the details of your NFT
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Name</Label>
                <Input id="current" type="text" value={name} onChange={handleNameChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Price (in sol)</Label>
                <Input id="new" type="number" value={price || ''} onChange={handlePriceChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
     <div className=' flex justify-center mt-5'> <Button> Upload </Button></div>
     </div>
  );
}

export default Page;
