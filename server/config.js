module.exports = {
    firebaseConfig: {
        apiKey: "AIzaSyCSZeHDSuQD872vplPWj97UJxbr0C820dw",
        authDomain: "pet-adoption-2b0e5.firebaseapp.com",
        projectId: "pet-adoption-2b0e5",
        storageBucket: "pet-adoption-2b0e5.appspot.com",
        messagingSenderId: "197344513600",
        appId: "1:197344513600:web:9c39ebb926b01d00b959a5",
        measurementId: "G-K47ZJSZDVB",
    },
    firestoreConfig: {
        "type": "service_account",
        "project_id": "pet-adoption-2b0e5",
        "private_key_id": "886cf5f269bef7b33bf7870e05ce2a55ac45ffc9",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJfoXcwBpv3xgq\n552J+JbxpN8bnNkcwT6brZGOhhuCUR5x6AK+5Qu3XXS/T2tkLxCWSdm3mQwW/d+2\no9s2bYyXzVHLrLUdjO09/8hc5rZoDuhiWZrTslQ3FuIrEgTDlvEEh8074IcDIRxH\nsvn4pdYmmVlptvE5hniU+YtXyOzhur3bhlcBOZ2qPW891fP7/NiBZ3QPtnle7TnQ\n/+++oRklSC07iO+EiunvNy9UOL8OMFCpWJrNAj7MYrg/X/qTVxkN6Tvyk/P+/Ti6\nkhNeZpC/aTwX6H7KDySRjYOFYgfo2bOEiEP4eeFslLI1IweOGfHJXNrqY+qJCwEm\nRbnB+aJnAgMBAAECggEALWpGmrxz2P5EULtWv1fYEcwS+4LNTtVhmq4y7hhdD/Df\nt1XPdJ5klyZJ36rzbifLicxIdcDZwD7lkyF4kdp8Q2TkSE97nRb8DCrgSsw3ldmy\nWCSRKKD7qVUPkhykFT+qwFYplJLla3eli6WUAQ7D53xN8m1pDom4GP/r/9PKTJAn\nwWL4brJGN9/YONzwuBgbkEZauV2YvSywzEy8G24I6QiYGugFiZtk7F23yGxwS+qT\n2edseoed5m7kTIGLwMDFXycEWh3avzq550XloINyBXD8sluAmTbCAGh64gJoKOua\nkOZI6Qbv+TKdrFNClNuk0pbzXgaRKAZjWC8ZpJK3LQKBgQDmSv+uPII9uj3sopUt\nWRm8Y4l7fgCmN3EOJB6pClE4zBGZwf8r8Uisu4S1AVgFvHmZSTzJ+fqgpvjiJEbN\nI/blQDS1xEvu1tDiBy8VRLI9gAUO1evoosWQD088VXgwrDID3yvZLV0Dq9pVyCA4\nXBx4NfySOj/eXTzov1WBzn/BewKBgQDf/I2GfEd42z5XQkQRPE0eaj6op1VX2bk6\nHt808AOC88tFVKxxkHPN5CWexr8xo8+xnzjhnCIZqTVG7ido/tJDErwzmQsYto/8\n28m2lApT+juuaJrIGvn6AvnO52ErDRGwfIYcALXjKpUIc3n6BqagtoSZ4fV+hGy3\nb4165X4hBQKBgQDTSwif8oCE5jYewWUhwFhuktz3YzpxRvkBwn4nFoJDHGkhq+7V\ngIHvifVOpbb/PFhNHfcaUbN0Zv5/bk1Ptqm22VwDUeFhd9MbLwAyAV+QMb9yRzA1\nt/KQJJvMfZbTAYq6Jq7yij6HOcwPXJjDXS/5036zI6KqAN37pmFrwe1RtQJ/cb3O\nIHz7zmOHRMhhyF7WypspNnvC2tm1Nc53impXXihvEMXuy7yPEf7JG9fRP2PwFELG\nn8qphl5mr55AZREBtQ3OhGUzPVl3xO/Xft+uXvazV93Gu9b3Gf5o3Kiirznzwat6\nbr3tn24AQEpjppO6CeKlc39LKvQUQRJkxgPECQKBgQDGyKXVBRijdrQHZM7wxnnW\nf4Hyw7lEx425RJ9RJav1kDgFMz/iOmK4l+vBVndUZ0LSDf7o+Ka40OBH6tE27S85\n4hx567Nf7hYMugQKi2c5x6xqlEb7do+qevTAtZRJFaH813r8O99poypKtG22D4hM\n1W85uFxfySYYc/uY6pn+cw==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-scl05@pet-adoption-2b0e5.iam.gserviceaccount.com",
        "client_id": "114121273688080408967",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-scl05%40pet-adoption-2b0e5.iam.gserviceaccount.com"
    },
    db: {
        bucketName: "pet-adoption-2b0e5.appspot.com",
        petsCollection: "pets",
        usersCollection: "users"
    },
    authentication: {
        userCookie: "petAdoptionUserId"
    },
    port: 5000,
};