// app/api/certsyjwt/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
    const res = await fetch(
      process.env.BACKEND_API + "/api/certsyjwt",
      {cache: 'no-store'});

    const data = await res.json();
    const bearer = data.jwt;
    const headers = {
        'content-type': 'application/json',
        'authorization': '',
      }
    headers.authorization = "Bearer " + bearer;

    const graphqlRes = await fetch('https://app.certsy.com/api/v1/candidate/graphql_query.json', {
        cache: 'no-store',
        method: 'POST',
        headers: headers,
        body: JSON.stringify([
            { 
              'cache': 'no-store',
              'operationName': 'getDashboardData',
              'variables': {},
              'query': 'query getDashboardData {\n\n  auRtw: candidateAuRtwSubmissionSignalCollectionFetch {\n    items {\n      id\n      status\n      createdAt\n      verificationResult {\n          expirationStatus\n          expiryDate\n          fullName\n          resultDisplayText\n          verificationDocumentFullName\n          verificationDocument\n          visaSubclassDisplayText\n          verifiedAt\n      }\n    }\n  }\n\n  education: candidateEducationSubmissionCollectionFetch {\n    items {\n      id\n      status\n      createdAt\n      verificationResult {\n          fullName\n          educationProvider\n          qualification\n          conferralYear\n          verifiedAt\n          courseName\n          majors\n          withHonours\n      }\n    }\n  }\n}'
            }
          ])
      })
    
    const graphqlData = await graphqlRes.json();

    const path = "/api/graphql";
    revalidatePath(path);

    return NextResponse.json(graphqlData);
}
