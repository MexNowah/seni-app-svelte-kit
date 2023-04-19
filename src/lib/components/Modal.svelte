<script>
	export let showModal; // boolean

    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidTimes from "svelte-icons-pack/fa/FaSolidTimes";

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
    class="no-show-scroll"
>
	<div on:click|stopPropagation >
        <div class="flex justify-end items-end mr-2 mt-2">
            <button class="" autofocus on:click={() => dialog.close()}>
                <Icon src={FaSolidTimes} />
            </button>
        </div>
        
		<slot name="header" />
		
		<slot />
		<hr />
		<!-- svelte-ignore a11y-autofocus -->
	</div>
</dialog>

<style>
	dialog {
		max-width: 95%;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		min-width: 50%;
	}
	dialog > div {
		padding: 5px;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
