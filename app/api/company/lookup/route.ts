import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  getCompanyById,
  getCompanyByName,
  searchCompanies
} from "@/lib/data/companies";

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const id = searchParams.get("id")?.trim() ?? "";

  if (id) {
    const company = getCompanyById(id);
    return NextResponse.json({ company });
  }

  if (query.length >= 2) {
    const exact = getCompanyByName(query);
    const results = searchCompanies(query);

    return NextResponse.json({
      results,
      company: exact
    });
  }

  return NextResponse.json({ results: [], company: null });
}
