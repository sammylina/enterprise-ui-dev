import reducer, {Item, add, toggle, update, remove} from './items-slice' 


describe("Store", () => {

    it('should return empty store', () => {
        const store = reducer(undefined, {type: 'nothing'})
        expect(store).toEqual([])

    })

})

describe("Reducers", () => {

    let store: Item[];

    it.todo('should add Item to store', () => {
        const item = {name: 'Phone', packed: true}
        const store = reducer([], add(item))    
        expect(store).toContain({
            id: expect.any(String),
            name: 'Phone',
            packed: false 
        })
    })

    beforeEach(() => {
        const item = {name: 'Phone', packed: false}
        store = reducer([], add(item))    
    })

    it("should toggle item packed property", () => {
        const [item] = store;
        store = reducer(store, toggle({id: item.id}))    
        expect(store[0]).toContain({
            ...item,
            packed: true 
        })
    })

    it('should update item name with given ID', () => {
        const [item] = store;
        store = reducer(store, update({id: item.id, name: 'IPhone'}))
        expect(store[0]).toContain({
            ...item,
            name: 'IPhone'
        })
    })

    it('should remove an item', () => {
        const [item] = store;
        expect(store).toContainEqual({
            ...item
        })
        store = reducer(store, remove({id: item.id}))
        expect(store).not.toContain({...item})
    })

    it('should unpack all items', () => {
        const item2 = {name: 'book', packed: false};
        const item3 = {name: 'magazin', packed: true};
        store = reducer(store, add(item2))
        store = reducer(store, add(item3))

    })
})