export default function DeleteSelected(props) {
  
  
  return(
    <div className="delete-section">
      <button className="button all-button" onClick={() =>  props.handlerDeleteAllItems() } value="del-all" >Delete all</button>

    </div>
  )
}