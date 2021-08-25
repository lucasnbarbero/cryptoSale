<template>
  <div class="main-content" role="document">
    <div class="col-md-4">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Operacion</h5>
      </div>
      <div class="modal-body">
        <div class="form">
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Criptomoneda</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Cantidad</label>
            <input class="form-control" id="message-text" />
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Precio</label>
            <input class="form-control" id="message-text" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.main-content{
  position: absolute;
  z-index: 2;
  background: rgba(0,0,0,0.7);
  width: 100%;
  height: 100vh;
  top: 0;
}

</style>