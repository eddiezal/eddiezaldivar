import { NextResponse } from "next/server";
import { join } from "path";
import { promises as fs } from "fs";

export async function GET() {
  const filePath = join(process.cwd(), "public", "lead-magnet", "funnel-health-check-v1.pdf");
  const file = await fs.readFile(filePath);
  return new NextResponse(file, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=\"Funnel-Health-Check.pdf\""
    }
  });
}
