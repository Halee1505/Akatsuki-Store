import AddClothesState from "../context/addclothesstate";
import AddClothes from "../admincomponents/addclothes";

export default function AddClothesPage() {
    return (
        <AddClothesState>
            <AddClothes />
        </AddClothesState>
    )
}