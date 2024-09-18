import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";
