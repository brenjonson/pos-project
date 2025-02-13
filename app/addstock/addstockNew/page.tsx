import NewIngredian from "@/components/stock/NewIngredian"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function page() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">เพิ่มวัตถุดิบใหม่</CardTitle>
            </CardHeader>
            <CardContent>
              <NewIngredian/>
            </CardContent>
          </Card>
        </div>
  )
}