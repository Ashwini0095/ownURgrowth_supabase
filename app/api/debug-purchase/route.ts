import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    console.log('DEBUG: Checking all records for userId:', userId);

    const allRecords: any[] = [];
    const collections = ['payments', 'purchases'];
    
    for (const collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allRecords.push({
          collection: collectionName,
          id: doc.id,
          data: data
        });
      });
    }

    console.log('DEBUG: All records found:', allRecords);
    
    return NextResponse.json({ 
      userId,
      totalRecords: allRecords.length,
      records: allRecords
    });
    
  } catch (error) {
    console.error('DEBUG API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
