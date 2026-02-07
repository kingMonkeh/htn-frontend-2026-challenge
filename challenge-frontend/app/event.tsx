import { Button } from "@/components/ui/button"
import { format_date } from "@/lib/utils";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function Event(eventData: any) {
  return (
    <Card className="relative mx-auto border border-black w-full bg-white">
      <CardHeader>
        <CardTitle>{eventData.data.name}</CardTitle>
        <p className="text-sm font-medium text-blue-600 mt-1">
          {format_date(eventData.data.start_time)} - {format_date(eventData.data.end_time)}
        </p>
        <CardDescription>
          {eventData.data.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link className="w-full border border-black" href={`/event/${eventData.data.id}`} passHref>
          <Button className="w-full bg-white text-black hover:text-white hover:bg-black">View Event</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
