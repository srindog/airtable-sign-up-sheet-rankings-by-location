
import { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const emailToInfo = new Map()
    return table.select({
      fields: ['Email', 'Neighborhood', 'Created'],
      view: 'Grid view',
      sort: [{field: "Created", direction: "desc"}]
    }).eachPage(function page(records: any, fetchNextPage: any) {
      // This function (`page`) will get called for each page of records.
      records.forEach((record: any) => { 
        const email = record.get('Email')
        const fullNeighborhood = record.get('Neighborhood')
        if (emailToInfo.has(email) || !fullNeighborhood) {
          return;
        }
        const [neighborhood, city] = fullNeighborhood.split(',')
        emailToInfo.set(email, { neighborhood, city: city.trim() })
      });
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
  
    }, function done(err: any) {
        if (err) { console.error(err); return; }
        const waitlist = Array.from(emailToInfo, ([key, value]) => (value));
        return res.status(200).json(waitlist);
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Something went wrong! 😕" });
  }
};