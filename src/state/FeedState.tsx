// const tokensQuery = `
// query {
//   collections(orderBy: timestampOfLastMint, orderDirection: desc) {
//     id
//     collectionID
//     name
//     symbol
//     items {
//       id
//       name
//       description
//       mediaLink
//       mintedTimeStamp
//       takenAt
//       isLive
//       token_id
//       owner_of
//       filetype
//       isLive
//       latitude
//       longitude
//     }
//   }
// }
// `

// interface Item {
// description: string
// filetype: 'photo' | 'video'
// id: string
// isLive: boolean
// latitude: string
// longitude: string
// mediaLink: string
// mintedTimeStamp: number
// name: string
// owner_of: string
// takenAt: string
// token_id: string
// }
// interface Collection {
// collectionID: string
// id: string
// item: Array<Item>
// name: string
// symbol: string
// }

// interface CollectionQueryResponse {
// collections: Array<Collection>
// }

// const [collectionsResult, reexecuteCollectionsQuery] = useQuery<CollectionQueryResponse>({
// query: tokensQuery,
// })
// const { data, fetching, error } = collectionsResult

// useEffect(() => {
// console.log(data?.collections)
// console.log(fetching)
// console.log(error)
// // client
// //   .query(tokensQuery)
// //   .toPromise()
// //   .then((data: OperationResult<CollectionQueryResponse>) => {
// //     console.log(data.data?.collections[0])
// //   })
// //   .catch((error) => {
// //     console.log(error)
// //   })
// }, [collectionsResult])
