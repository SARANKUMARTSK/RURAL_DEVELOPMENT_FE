import React, { useState } from 'react'
import TopBar from '../../../components/TopBar'
import '../app.css'
import HomeIcon from '@mui/icons-material/Home';

function AddImage() {
  const[imageFile,setImageFile]=useState(null)

  return <>
  <TopBar/>
  <div className='button-end'><button ><HomeIcon/>Home</button></div>

  <div className="addImage">
    {!imageFile?
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACxCAMAAAAh3/JWAAAAUVBMVEX///
    +zs7MwMDAlJSVERESurq6tra26urrCwsK3t7fOzs729vbIyMja2tr8/Pzv7+/i4uLq6urLy8vU1NTd3d0CAgI0NDRYWF
    jr6+shISFqamqx5iXzAAAD8ElEQVR4nO3c227aQBRGYTutbYzxAUxT2vd/0BoTAvGMV+Eis7eSf91UqpAyfJoZHzBkv15
    fVLzf2WumVvqZvVgPwW2dcNYTDiQcSDiQcCDhQMKBhAMJBxIOJBxIOJBwIOFAwoGEAwkHEg4kHEg4kHAg4UDCgYQDCQcS
    DiQcSDiQcCDhQMKBhAMJBxIOJBxIOJBwIOFAwoGEAwkHEg4kHEg4kHAg4UDCgYQDCQfygdP1+2M7jttxbI/DvrEezjV7nL
    7d5WUxl1/+Kcp6d+xtRzVnjNNvJ5A80vS/h73hwOZMcYaqjMG8A+VtZza2c4Y4Qx6dMx/nz2g0uDkznKb6L81l9gwmw5uz
    wmlxQd1X7izGN2eEs3lo2rxNntpq57HBeWxJ3TI68zHBqZ+jmbKZOxY41dM2eZV6jHMGOIcn19Q5m0N6epzh4ePUfaXF5UR
    ynC4+b84XVJupuoxfTuSbpKN8G2tqnEOUJh9P1xf0bfRYZjF1UuM0kUUVnAX3MR6Dc8HUOLvInNiGLxtDwzLlMC8lxukibz
    p68dQGc6dIf5GVGCd8z3Gb2BSLTLBPLjFOcG68egITHtXSnwimxQm34/V3PC51inTjfCstTrCqitPqa/vla8vkl59pcTbPLJ
    UAMvmZTlqc4P0e4cXL/emL4wRbTkErZTnNvjjOqarzopwqrtGrvxnO9W92TdOf9sNwpFUVLqsvviE/1XINlslvB/rFCQ7lef
    Ih+MXZLm3SX5a7xQkuUfGw/0lj8IoTnC+m33Lc4oSX7wb3SZ3i7IMr1O9wm/SxTuE9sW9xg/2RwnljcEme+cSJPIFRpj9UZS
    5xduFHD8XBZCTucJo6YmOx4WT+cGIPNVnZOMPpYg81lTZrKnOGs49+DmyyF895wol8zDll+LS2I5zIUWrabiyfRPaDE91u7J
    bUOTc4EZuiNv6KiBecyJqKPX2RNic44R2KvDD/XogTnD44ThWV7XdC5nzghA9fmJ343ecCJ3y+wHy7mXOB49TGBU4wcawuNJd
    5wAk+93WwF885wFkeqgyejFzJAc5yVdXG47nlAGfx3GjRGo/nlgOcxZaT/jGc1RzgLLYcgyfV17LH6fL6Q+mfNFnNHsdxwoGE
    AwkHEg4kHEg4kHAg4UD2OGNdfai2+0mYZfY4W6/3AV3g5MJZTTiQcCDhQMKBhAMJBxIOJBxIOJBwIOFAwoEOtx9vuPzGuHDuRt
    Assx3PXfY4jhMOJBxIOJBwIOFAwoGEAwkHEg4kHEg4kHAg4UDCgYQDCQcSDiQcSDiQcCDhQMKBhAMJBxIOJBxIOJBwIOFAwoGE
    AwkHEg4kHEg4kHAg4VATzg8V78/ff21vKcqLX1WgAAAAAElFTkSuQmCC"/>:<img src={URL.createObjectURL(imageFile)}></img>
    }
    <form>
        <input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files[0])} />
        <textarea className='event-input' type="text" placeholder='Enter About Event' />
        <button>Add to Gallery</button>
    </form>
  </div>
  </>
}

export default AddImage