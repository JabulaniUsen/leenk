import { createClient } from "./supabase/client"
import { v4 as uuidv4 } from "uuid"

/**
 * Upload a business logo to Supabase Storage
 * @param file The image file to upload
 * @param businessId The business ID for organizing files
 * @returns The public URL of the uploaded image
 */
export async function uploadBusinessLogo(
  file: File,
  businessId: string
): Promise<string> {
  const supabase = createClient()

  // Verify user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error("User must be authenticated to upload business logo")
  }

  // Verify business ID matches authenticated user ID
  if (user.id !== businessId) {
    throw new Error("Business ID must match authenticated user ID")
  }

  // Generate a unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${uuidv4()}.${fileExt}`
  const filePath = `${businessId}/${fileName}`

  // Upload the file to business_logo bucket
  const { data, error } = await supabase.storage
    .from("business_logo")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    console.error("Storage upload error:", error)
    throw new Error(`Failed to upload business logo: ${error.message}`)
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("business_logo").getPublicUrl(data.path)

  return publicUrl
}

/**
 * Delete a business logo from Supabase Storage
 * @param url The public URL of the image to delete
 */
export async function deleteBusinessLogo(url: string): Promise<void> {
  const supabase = createClient()

  // Extract the path from the URL
  const urlObj = new URL(url)
  const pathParts = urlObj.pathname.split("/")
  const filePath = pathParts.slice(pathParts.indexOf("business_logo") + 1).join("/")

  // Delete the file from business_logo bucket
  const { error } = await supabase.storage.from("business_logo").remove([filePath])

  if (error) {
    console.error("Failed to delete business logo:", error)
    // Don't throw - deletion failure shouldn't block the operation
  }
}

/**
 * Upload an image file to Supabase Storage (for messages)
 * @param file The image file to upload
 * @param folder The folder path in storage (e.g., 'messages')
 * @param businessId The business ID for organizing files
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  folder: string,
  businessId: string
): Promise<string> {
  const supabase = createClient()

  // Generate a unique filename
  const fileExt = file.name.split(".").pop()
  const fileName = `${uuidv4()}.${fileExt}`
  const filePath = `${folder}/${businessId}/${fileName}`

  // Upload the file
  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`)
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(data.path)

  return publicUrl
}

/**
 * Delete an image from Supabase Storage
 * @param url The public URL of the image to delete
 */
export async function deleteImage(url: string): Promise<void> {
  const supabase = createClient()

  // Extract the path from the URL
  const urlObj = new URL(url)
  const pathParts = urlObj.pathname.split("/")
  const bucket = pathParts[2] // Usually 'images'
  const filePath = pathParts.slice(3).join("/") // Everything after bucket name

  // Delete the file
  const { error } = await supabase.storage.from(bucket).remove([filePath])

  if (error) {
    console.error("Failed to delete image:", error)
    // Don't throw - deletion failure shouldn't block the operation
  }
}

