import { NextResponse } from "next/server";

export function getSuccessResponse(data: any) {
  return NextResponse.json({ status: true, data });
}

export function getNotFoundResponse(message: string = "not found") {
  return NextResponse.json({ status: false, message }, { status: 404 });
}
