import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { uid, email, displayName, photoURL } = await request.json();

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
    }

    const ref = doc(db, 'users', uid);
    const existing = await getDoc(ref);

    const base = {
      uid,
      email: email ?? null,
      displayName: displayName ?? null,
      photoURL: photoURL ?? null,
      lastLogin: serverTimestamp(),
    };

    if (existing.exists()) {
      await setDoc(ref, base, { merge: true });
    } else {
      await setDoc(ref, { ...base, createdAt: serverTimestamp() });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('user-profile upsert failed:', error);
    return NextResponse.json(
      { error: 'Failed to save user profile' },
      { status: 500 }
    );
  }
}
