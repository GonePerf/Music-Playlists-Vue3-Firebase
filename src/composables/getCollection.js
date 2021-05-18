import { ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"
import { projectFirestore } from "../firebase/config"

const getCollection = (collection, query) => {
    const error = ref(null)
    const documents = ref(null)
    
    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')
        
    if(query) {
        collectionRef = collectionRef.where(...query)
    }
    
    const unsub = collectionRef.onSnapshot(snap => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'Could not fetch data'
    })
    
    watchEffect((onInvalidate) => {
        onInvalidate(() => {
            unsub()
        })
    })
    
    return { error, documents }
}

export default getCollection